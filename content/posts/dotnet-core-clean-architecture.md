---
title: ".NET Core: Arquitectura limpia y patrones modernos"
date: "2025-11-28"
excerpt: "Domina .NET con Clean Architecture, DI, middleware, Entity Framework Core y patrones para APIs escalables y mantenibles."
category: "Backend"
tags: ["dotnet", "csharp", "asp.net", "architecture"]
readTime: "15 min lectura"
---

# .NET Core: Arquitectura limpia y patrones modernos

.NET Core es la plataforma ideal para APIs empresariales. Exploremos arquitectura limpia y mejores prácticas.

## Clean Architecture con .NET

### Estructura de proyecto

```
Solution/
├── src/
│   ├── Domain/              # Entidades y lógica de negocio
│   │   ├── Entities/
│   │   ├── ValueObjects/
│   │   ├── Interfaces/
│   │   └── Exceptions/
│   ├── Application/         # Casos de uso y DTOs
│   │   ├── UseCases/
│   │   ├── DTOs/
│   │   ├── Validators/
│   │   └── Mappings/
│   ├── Infrastructure/      # Implementación de datos
│   │   ├── Persistence/
│   │   ├── Repositories/
│   │   └── Services/
│   └── WebAPI/             # Controllers y configuración
│       ├── Controllers/
│       ├── Middleware/
│       └── Filters/
└── tests/
    ├── Domain.Tests/
    ├── Application.Tests/
    └── WebAPI.Tests/
```

## Domain Layer: Entidades ricas

```csharp
// Domain/Entities/Order.cs
public class Order
{
    public Guid Id { get; private set; }
    public Guid CustomerId { get; private set; }
    public DateTime OrderDate { get; private set; }
    public OrderStatus Status { get; private set; }
    private readonly List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

    private Order() { } // Para EF Core

    public static Order Create(Guid customerId)
    {
        return new Order
        {
            Id = Guid.NewGuid(),
            CustomerId = customerId,
            OrderDate = DateTime.UtcNow,
            Status = OrderStatus.Pending
        };
    }

    public void AddItem(Guid productId, int quantity, decimal unitPrice)
    {
        if (Status != OrderStatus.Pending)
            throw new DomainException("Cannot modify a processed order");

        if (quantity <= 0)
            throw new DomainException("Quantity must be positive");

        var existingItem = _items.FirstOrDefault(i => i.ProductId == productId);
        
        if (existingItem != null)
            existingItem.IncreaseQuantity(quantity);
        else
            _items.Add(OrderItem.Create(Id, productId, quantity, unitPrice));
    }

    public void ConfirmOrder()
    {
        if (_items.Count == 0)
            throw new DomainException("Cannot confirm order without items");

        Status = OrderStatus.Confirmed;
    }

    public decimal GetTotal() => _items.Sum(i => i.Subtotal);
}

public class OrderItem
{
    public Guid Id { get; private set; }
    public Guid OrderId { get; private set; }
    public Guid ProductId { get; private set; }
    public int Quantity { get; private set; }
    public decimal UnitPrice { get; private set; }
    public decimal Subtotal => Quantity * UnitPrice;

    private OrderItem() { }

    public static OrderItem Create(Guid orderId, Guid productId, int quantity, decimal unitPrice)
    {
        return new OrderItem
        {
            Id = Guid.NewGuid(),
            OrderId = orderId,
            ProductId = productId,
            Quantity = quantity,
            UnitPrice = unitPrice
        };
    }

    public void IncreaseQuantity(int amount)
    {
        if (amount <= 0)
            throw new DomainException("Amount must be positive");

        Quantity += amount;
    }
}

public enum OrderStatus
{
    Pending = 0,
    Confirmed = 1,
    Shipped = 2,
    Delivered = 3,
    Cancelled = 4
}
```

## Application Layer: CQRS con MediatR

```csharp
// Application/UseCases/Orders/CreateOrder/CreateOrderCommand.cs
public record CreateOrderCommand(Guid CustomerId, List<OrderItemDto> Items) 
    : IRequest<Result<Guid>>;

public record OrderItemDto(Guid ProductId, int Quantity);

// Handler
public class CreateOrderCommandHandler 
    : IRequestHandler<CreateOrderCommand, Result<Guid>>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<CreateOrderCommandHandler> _logger;

    public CreateOrderCommandHandler(
        IOrderRepository orderRepository,
        IProductRepository productRepository,
        IUnitOfWork unitOfWork,
        ILogger<CreateOrderCommandHandler> logger)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<Result<Guid>> Handle(
        CreateOrderCommand request, 
        CancellationToken cancellationToken)
    {
        try
        {
            // Crear orden
            var order = Order.Create(request.CustomerId);

            // Agregar items
            foreach (var item in request.Items)
            {
                var product = await _productRepository
                    .GetByIdAsync(item.ProductId, cancellationToken);

                if (product == null)
                    return Result<Guid>.Failure($"Product {item.ProductId} not found");

                if (product.Stock < item.Quantity)
                    return Result<Guid>.Failure($"Insufficient stock for {product.Name}");

                order.AddItem(item.ProductId, item.Quantity, product.Price);
                product.DecreaseStock(item.Quantity);
            }

            order.ConfirmOrder();

            await _orderRepository.AddAsync(order, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Order {OrderId} created successfully", order.Id);

            return Result<Guid>.Success(order.Id);
        }
        catch (DomainException ex)
        {
            _logger.LogWarning(ex, "Domain validation failed");
            return Result<Guid>.Failure(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order");
            return Result<Guid>.Failure("An error occurred while creating the order");
        }
    }
}

// Query
public record GetOrderByIdQuery(Guid OrderId) : IRequest<Result<OrderDto>>;

public class GetOrderByIdQueryHandler 
    : IRequestHandler<GetOrderByIdQuery, Result<OrderDto>>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;

    public GetOrderByIdQueryHandler(
        IOrderRepository orderRepository, 
        IMapper mapper)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
    }

    public async Task<Result<OrderDto>> Handle(
        GetOrderByIdQuery request, 
        CancellationToken cancellationToken)
    {
        var order = await _orderRepository
            .GetByIdWithItemsAsync(request.OrderId, cancellationToken);

        if (order == null)
            return Result<OrderDto>.Failure("Order not found");

        var dto = _mapper.Map<OrderDto>(order);
        return Result<OrderDto>.Success(dto);
    }
}
```

## Infrastructure: Entity Framework Core

```csharp
// Infrastructure/Persistence/ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Customer> Customers { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}

// Infrastructure/Persistence/Configurations/OrderConfiguration.cs
public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");
        
        builder.HasKey(o => o.Id);
        
        builder.Property(o => o.CustomerId)
            .IsRequired();
        
        builder.Property(o => o.OrderDate)
            .IsRequired();
        
        builder.Property(o => o.Status)
            .HasConversion<string>()
            .IsRequired();

        builder.HasMany(o => o.Items)
            .WithOne()
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(o => o.CustomerId);
        builder.HasIndex(o => o.OrderDate);
    }
}

// Repository
public class OrderRepository : IOrderRepository
{
    private readonly ApplicationDbContext _context;

    public OrderRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Order?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        return await _context.Orders.FindAsync(new object[] { id }, ct);
    }

    public async Task<Order?> GetByIdWithItemsAsync(Guid id, CancellationToken ct = default)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id, ct);
    }

    public async Task AddAsync(Order order, CancellationToken ct = default)
    {
        await _context.Orders.AddAsync(order, ct);
    }

    public async Task<List<Order>> GetByCustomerIdAsync(
        Guid customerId, 
        CancellationToken ct = default)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .Where(o => o.CustomerId == customerId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync(ct);
    }
}
```

## WebAPI: Controllers y middleware

```csharp
// WebAPI/Controllers/OrdersController.cs
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Creates a new order
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateOrder(
        [FromBody] CreateOrderCommand command,
        CancellationToken ct)
    {
        var result = await _mediator.Send(command, ct);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return CreatedAtAction(
            nameof(GetOrder), 
            new { id = result.Value }, 
            result.Value);
    }

    /// <summary>
    /// Gets an order by ID
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetOrder(Guid id, CancellationToken ct)
    {
        var query = new GetOrderByIdQuery(id);
        var result = await _mediator.Send(query, ct);

        if (!result.IsSuccess)
            return NotFound(result.Error);

        return Ok(result.Value);
    }
}

// Middleware para manejo de excepciones
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (DomainException ex)
        {
            _logger.LogWarning(ex, "Domain exception occurred");
            await HandleExceptionAsync(context, ex, StatusCodes.Status400BadRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception occurred");
            await HandleExceptionAsync(context, ex, StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context, 
        Exception exception, 
        int statusCode)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        var response = new
        {
            statusCode,
            message = exception.Message,
            details = exception.StackTrace
        };

        await context.Response.WriteAsJsonAsync(response);
    }
}
```

## Dependency Injection

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("Infrastructure")));

// Repositories
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// MediatR
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(CreateOrderCommand).Assembly));

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

// Validators
builder.Services.AddValidatorsFromAssembly(typeof(CreateOrderCommandValidator).Assembly);
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

// Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## FluentValidation

```csharp
public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty().WithMessage("Customer ID is required");

        RuleFor(x => x.Items)
            .NotEmpty().WithMessage("Order must have at least one item")
            .Must(items => items.Count <= 50)
            .WithMessage("Order cannot have more than 50 items");

        RuleForEach(x => x.Items)
            .SetValidator(new OrderItemDtoValidator());
    }
}

public class OrderItemDtoValidator : AbstractValidator<OrderItemDto>
{
    public OrderItemDtoValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty().WithMessage("Product ID is required");

        RuleFor(x => x.Quantity)
            .GreaterThan(0).WithMessage("Quantity must be positive")
            .LessThanOrEqualTo(100).WithMessage("Quantity cannot exceed 100");
    }
}
```

## Conclusión

.NET Core ofrece herramientas poderosas para arquitectura empresarial:
1. Clean Architecture para separación de responsabilidades
2. CQRS con MediatR para escalabilidad
3. Entity Framework Core para acceso a datos
4. Dependency Injection nativa
5. Middleware flexible para cross-cutting concerns

¡Construye APIs robustas y mantenibles!

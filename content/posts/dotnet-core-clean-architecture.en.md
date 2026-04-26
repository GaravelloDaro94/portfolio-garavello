---
title: ".NET Core: Clean architecture and modern patterns"
date: "2025-11-28"
excerpt: "Master .NET with Clean Architecture, DI, middleware, Entity Framework Core, and patterns for scalable and maintainable APIs."
category: "Backend"
tags: ["dotnet", "csharp", "asp.net", "architecture"]
readTime: "15 min read"
---

# .NET Core: Clean architecture and modern patterns

.NET Core is the ideal platform for enterprise APIs. Let's explore clean architecture and best practices.

## Clean Architecture with .NET

### Project structure

```
Solution/
├── src/
│   ├── Domain/              # Entities and business logic
│   │   ├── Entities/
│   │   ├── ValueObjects/
│   │   ├── Interfaces/
│   │   └── Exceptions/
│   ├── Application/         # Use cases and DTOs
│   │   ├── UseCases/
│   │   ├── DTOs/
│   │   ├── Validators/
│   │   └── Mappings/
│   ├── Infrastructure/      # Data implementation
│   │   ├── Persistence/
│   │   ├── Repositories/
│   │   └── Services/
│   └── WebAPI/              # Controllers and configuration
│       ├── Controllers/
│       ├── Middleware/
│       └── Filters/
└── tests/
    ├── Domain.Tests/
    ├── Application.Tests/
    └── WebAPI.Tests/
```

## Domain Layer: Rich entities

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

    private Order() { } // Required by EF Core

    public static Order Create(Guid customerId) => new Order
    {
        Id = Guid.NewGuid(),
        CustomerId = customerId,
        OrderDate = DateTime.UtcNow,
        Status = OrderStatus.Pending
    };

    public void AddItem(Guid productId, int quantity, decimal unitPrice)
    {
        if (Status != OrderStatus.Pending)
            throw new DomainException("Cannot modify a processed order");

        if (quantity <= 0)
            throw new DomainException("Quantity must be positive");

        var existing = _items.FirstOrDefault(i => i.ProductId == productId);
        if (existing != null)
            existing.IncreaseQuantity(quantity);
        else
            _items.Add(OrderItem.Create(Id, productId, quantity, unitPrice));
    }

    public void ConfirmOrder()
    {
        if (_items.Count == 0)
            throw new DomainException("Cannot confirm an order without items");

        Status = OrderStatus.Confirmed;
    }

    public decimal GetTotal() => _items.Sum(i => i.Subtotal);
}
```

## Application Layer: Use cases with MediatR

```csharp
// Application/UseCases/CreateOrder/CreateOrderCommand.cs
public record CreateOrderCommand(
    Guid CustomerId,
    List<OrderItemDto> Items
) : IRequest<Guid>;

// Application/UseCases/CreateOrder/CreateOrderHandler.cs
public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Guid>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateOrderHandler(IOrderRepository orderRepository, IUnitOfWork unitOfWork)
    {
        _orderRepository = orderRepository;
        _unitOfWork      = unitOfWork;
    }

    public async Task<Guid> Handle(CreateOrderCommand command, CancellationToken ct)
    {
        var order = Order.Create(command.CustomerId);

        foreach (var item in command.Items)
            order.AddItem(item.ProductId, item.Quantity, item.UnitPrice);

        order.ConfirmOrder();

        await _orderRepository.AddAsync(order, ct);
        await _unitOfWork.CommitAsync(ct);

        return order.Id;
    }
}
```

## Dependency Injection configuration

```csharp
// Program.cs
builder.Services
    .AddApplication()      // MediatR, validators, mappings
    .AddInfrastructure()   // EF Core, repositories, external services
    .AddPresentation();    // Controllers, filters, middleware

// Infrastructure/DependencyInjection.cs
public static IServiceCollection AddInfrastructure(this IServiceCollection services)
{
    services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection")));

    services.AddScoped<IOrderRepository, OrderRepository>();
    services.AddScoped<IUnitOfWork, UnitOfWork>();

    return services;
}
```

## Best practices

1. **Keep the Domain layer free of infrastructure concerns** — no framework dependencies.
2. **Use value objects** for concepts like Money, Address, or Email rather than primitives.
3. **Validate at the Application boundary** using FluentValidation pipeline behaviors.
4. **Write unit tests against use cases**, not controllers or repositories.
5. **Prefer records for commands and queries** — immutability prevents accidental mutation.

## Conclusion

Clean Architecture in .NET forces a healthy separation of concerns that pays off as teams and codebases grow. The initial overhead of the layered structure is quickly offset by the ease of testing, replacing infrastructure, and onboarding new developers.

interface UpdateWithOptions {
    name?: string
    description?: string
    price?: number
  }
export class Product {
  public id: string
  public name: string
  public description: string
  public price: number
  public createdAt: Date
  public updatedAt: Date

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.name = name ?? this.name;
    this.description = description ?? this.description;
    this.price = price ?? this.price;
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  updateWith({
    name,
    description,
    price,
  }: UpdateWithOptions) {
    if (name) this.name = name
    if (description) this.description = description
    if (price) this.price = price
  }
}


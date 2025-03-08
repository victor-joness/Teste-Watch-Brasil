import { Category } from "../../core/Entities/Category";

export class CategoriesMapper {
  public static fromCategoryToDB(categories: Category): Category {
    return categories;
  }

  public static fromDBtoCategory(categories: any): Category {
    return new Category(
      categories.Id,
      categories.Name,
      categories.DeletionDate,
      categories.ModifiedDate,
      categories.CreationDate
    );
  }
}

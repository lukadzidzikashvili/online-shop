export enum PostErrorEnum {
  emptyCategory,
  emptyTitle,
  emptyDescription,
  emptyPrice,
  emptyTelnumber,
  emptyLocation,
}

export const PostErrorEnumResolver: Record<keyof typeof PostErrorEnum, string> =
  {
    emptyCategory: 'გთხოვთ მიუთითოთ კატეგორია!',
    emptyTitle: 'გთხოვთ მიუთითოთ პროდუქტის დასახელება!',
    emptyDescription: 'გთხოვთ მიუთითოთ პროდუქტის აღწერა!',
    emptyPrice: 'გთხოვთ მიუთითოთ პროდუქტის ფასი!',
    emptyTelnumber: 'გთხოვთ მიუთითოთ ტელეფონის ნომერი!',
    emptyLocation: 'გთხოვთ მიუთითოთ ადგილმდებარეობა!',
  };

import { IsNotEmpty } from 'class-validator';
import { PostErrorEnumResolver } from 'src/enum/errors/posts/posts.errors.enum';

export class CreatePostDto {
  @IsNotEmpty({ message: PostErrorEnumResolver.emptyCategory })
  categoryId: number;

  @IsNotEmpty({ message: PostErrorEnumResolver.emptyTitle })
  title: string;

  @IsNotEmpty({ message: PostErrorEnumResolver.emptyDescription })
  description: string;

  @IsNotEmpty({ message: PostErrorEnumResolver.emptyPrice })
  price: string;

  @IsNotEmpty({ message: PostErrorEnumResolver.emptyTelnumber })
  telnumber: string;

  @IsNotEmpty({ message: PostErrorEnumResolver.emptyLocation })
  location: number;

  image: string;
}

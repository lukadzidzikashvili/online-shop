import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Users } from 'src/auth/entity/user.entity';

@Injectable()
export class FilesService {
  createFile(file, user: Users): string {
    const currentDate = new Date();
    const timestamp = currentDate
      .toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Tbilisi',
      })
      .replace(/[^\d]/g, '');
    const originalFileName = file.originalname;
    const fileExtension = originalFileName.split('.').pop();
    const fileNameWithoutExtension = originalFileName.slice(
      0,
      -(fileExtension.length + 1),
    );
    const fileName = `${fileNameWithoutExtension}_${timestamp}.${fileExtension}`;
    const userFolder = path.join(
      process.cwd(),
      'uploads',
      'images',
      user.id.toString(),
    );
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }
    const filePath = path.join(userFolder, fileName);
    const existingFiles = fs.readdirSync(userFolder);
    const existingFileNames = existingFiles.map((f) => f);
    if (existingFileNames.includes(fileName)) {
      throw new HttpException(
        'სამწუხაროდ ასეთი სახელით სურათი უკვე არსებობს!',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      fs.writeFileSync(filePath, file.buffer);
      return path.join(user.id.toString(), fileName);
    } catch (e) {
      throw new HttpException(
        'მოხდა შეცდომა ფაილის ატვირთვისას!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

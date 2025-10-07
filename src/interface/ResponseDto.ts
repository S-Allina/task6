import { SongDto } from "./SongDto";

export interface ResponseDto {
  isSuccess: boolean;
  result: SongDto[];
  displayMessage: string | null;
  errorMessages: string[] | null;
}

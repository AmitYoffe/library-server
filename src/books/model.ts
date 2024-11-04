import Writer from 'src/writers/dto/create-writer.dto';

export default interface Book {
  id: number;
  firstName: string;
  secondName: string;
  writer: Writer;
}

import Writer from 'src/writers/model';

export default interface Book {
  id: number;
  firstName: string;
  secondName: string;
  writer: Writer;
}

import Writer from 'src/writers/dto/create-writer.dto';

export default interface Book {
  id: number;
  title: string;
  writer: Writer;
  count: number;
}

// i think i can delete these...
export type FieldType = 'DATE' | 'STRING' | 'IP' | 'INT'|  'PORT'| 'DOMAIN';

export interface Field {
  id: string;
  order: number;
  type: FieldType;
  name: string;
  displayName: string;
  translations: { [lang: string]: string };
}

export interface Log {
  id: string;
  name: string;
  createdAt: string;
  fields: Field[];
}
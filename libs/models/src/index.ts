import typia, { tags } from 'typia';

export class Message {
  text!: string & tags.MinLength<1>;
}

export const validateMessage = typia.createValidate<Message>();

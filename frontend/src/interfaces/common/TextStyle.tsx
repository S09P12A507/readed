export interface TextStyle {
  fontSize?: string;
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  textAlign?: 'left' | 'center' | 'right';
  whiteSpace?:
    | 'inherit'
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'pre-line'
    | 'pre-wrap';
}

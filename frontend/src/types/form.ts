export interface FormField {
  label: string
  prop: string
  type: 'input' | 'password' | 'email'
}

export interface FormConfig {
  fields: FormField[]
}

export default interface BaseAutocompleteQueryFunction {
  (searchQuery: string): Promise<[]>;
}
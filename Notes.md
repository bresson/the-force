# Notes

## API

- Schema is justifiably vague; hence difficult to evaluate or validate data programatically. Perhaps generate the schema dynamically from database analysis to produce more explicit rules such as "enum," "const," etc.
- "Search" term for each top level domain ( "People," etc ) is hardbaked into the documents and nowhere else in API or data; consider placing this rule where it can be accessed programatically ... perhaps in schema or response

## Dataset

Data for each top level domain is structured as a graph with each domain referencing other domains.

## Services

- Why isn't the endpoint embedded inside HTTPService instead of inside API service?
  - Placing the root endpoint inside HTTPService is ideal but it also limits the flexibility of HTTPService is more than a single root or service is needed. Alternatively, Each external resource could conceivably get an instance of HTTPService ... much nicer!!!

## .env

Normally a sensitive / security concern. However this .env only contains a single reference that points to a public endpoint

## Other approaches include scope slots a la

https://dev.to/codinglukas/vue-js-pattern-for-async-requests-using-renderless-components-3gd#the-async-renderless-component

However, that pattern on the surface is a top level component that consumes child components when architecturally that should not be the case

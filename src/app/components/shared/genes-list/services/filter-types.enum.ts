// eslint-disable-next-line no-shadow
export enum FilterTypesEnum {
  disease = 'byDiseases',
  disease_categories = 'byDiseaseCategories',
  age_related_processes = 'byAgeRelatedProcess',
  selection_criteria = 'bySelectionCriteria',
  expression_change = 'byExpressionChange',
  methylation_change = 'byMethylationChange',
  aging_mechanism = 'byAgingMechanism',
  protein_classes = 'byProteinClass',
}

export enum SortEnum {
  byName = 'name',
  byAge = 'age',
  byCriteriaQuantity = 'criteriaQuantity',
}

def filter_by_category(queryset, category):
    return queryset.filter(category__iexact=category)

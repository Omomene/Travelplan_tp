def apply_filters_to_search_results(data, query_params):
   
    results = data.get("data", []) if isinstance(data, dict) else data or []
    country = query_params.get("country")
    category = query_params.get("category")
   
    if country:
        results = [r for r in results if r.get("address_obj", {}).get("country") == country]
    
    if category:
        
        filtered = []
        for r in results:
            cat = r.get("category", {}).get("name") or ""
            subcats = [sc.get("name") for sc in r.get("subcategory", [])] if r.get("subcategory") else []
            all_cats = [cat] + subcats
            if category in all_cats:
                filtered.append(r)
        results = filtered
    return results

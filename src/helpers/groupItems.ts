const groupItems = (array: any) => {
  const groupArray = array?.reduce((groups: any, item: TCart) => {
    const existingGroup = groups.find((group: any) => group.name === item.name);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      groups.unshift({
        name: item.name,
        items: [item],
      });
    }
    return groups;
  }, []);
  return groupArray;
};

export default groupItems;

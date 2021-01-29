
export const SortData = (data) =>{
  const SortedData = [...data];
  return SortedData.sort((a,b)=> (a.cases > b.cases ? -1:1));
}

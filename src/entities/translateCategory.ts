 export function translateCategory(t:(value:string)=>string,category:string){
 const nameCategory = category;
 return `${t(`${nameCategory.toLocaleLowerCase()}`)}`
}

import axios from '@/plugins/axios'

interface Auth {
  barcode: string
}
interface Doc {
  barcode: string
}
interface Item {
  barcode: string
  iddoc: string
}

export function getAuth(data: Auth) {
  console.log(data)
  return {
    worker_id: '22222',
    name: 'Вася Усович Пупкин',
  }
}

export function getDoc(data: Doc) {
  console.log(data)
  return {
    iddoc: '0123123123',
    doc_name: 'Документ',
  }
}

export function getItem(data: Item) {
  console.log(data)
  return [
    '1 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s33078, ',
    '2 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s33079, ',
    '3 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s330710, ',
    '4 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s330711, ',
    '5 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s330711, ',
    '6 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s330711, ',
    '7 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s330711, ',
    '8 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s330711, ',
    '9 Test#^11117803753 TestTovar Primary LX-119-B ГАR Валдай , 43456, 33ssa09, s330711, ',
  ]
}

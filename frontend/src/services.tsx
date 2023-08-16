import axios from "axios";

const url = "/api/notes";

const getAll = async () => {
  const res = await axios.get(url)
  const fauxData = {
    content: 'Yayu, We are faux, faux i tell you!',
    important: true,
    id: 999
  }
  return res.data.concat(fauxData)
}

const create = async (newObj: object) => {
  const res = await axios.post(url, newObj)
  return res.data
}

const update = async (id: number, newObj: object) => {
  const res = await axios.put(`${url}/${id}`, newObj)
  return res.data
}

const deleteData = async (id: number) => {
  return await axios.delete(`${url}/${id}`)
  // surprisingly (await res).data is a thing. wow!
  // return res.data
}

export {
  getAll,
  create,
  update,
  deleteData
}
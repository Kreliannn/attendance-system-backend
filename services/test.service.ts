import Test from "../model/test.model"


export const getTest = async () => {
    return await Test.find()
}
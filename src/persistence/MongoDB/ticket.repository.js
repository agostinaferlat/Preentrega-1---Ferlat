import { ticketModel } from "./models/ticket.model.js";

const getAll= async (query, options) => {
    const tickets = await ticketModel.paginate(query, options);
    return tickets;
};

const getById= async (id) => {
    const ticket = await ticketModel.findById(id);
    return ticket;
};

const create = async (data) => {
    const ticket = await ticketModel.create(data);
    return ticket;
};

const update = async (id, data) => {
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, {new: true});
    return ticketUpdate;
};

const deleteOne = async (id) => {
    const ticket = await ticketModel.findByIdAndUpdate(id, {status: false}, {new: true});
    return ticket;
};

const checkTicketByCode = async (code) => {
    try {
        return await ticketModel.findOne({code});
    } catch (error) {
        console.error(error);
        throw new Error("Error when searching ticket by code");
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    checkTicketByCode
};

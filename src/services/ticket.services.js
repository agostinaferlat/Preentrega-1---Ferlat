import ticketRepository from "../persistence/MongoDB/ticket.repository.js";


const createTicket = async (userEmail, totalCart) => {

    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
    };

    const ticket = await ticketRepository.create(newTicket);
    return ticket;

};

export default { createTicket };
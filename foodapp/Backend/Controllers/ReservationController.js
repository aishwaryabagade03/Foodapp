import ReservationModel from "../Models/ReservationModel";

export const Addreservation = (req, res) => {
  try {
      const {fname, lname, email, contact,date, time,partysize,specialrequests, status } = req.body;
      const reservationData = new ReservationModel({
      fname: fname,
      lname: lname,
      email: email,
      contact: contact,
      date: date,
      time: time,
      partysize: partysize,
      specialrequests: specialrequests,
      status: status
      });

      reservationData.save();
      const validationError = reservationData.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      if (reservationData) {
        return res.status(201).json({
          data: reservationData,
          message: "Success",
        });
      }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Allreservations = async (req, res) => {
  try {
    const reservationData = await ReservationModel.find();
    if (reservationData) {
      return res.status(200).json({
        data: reservationData,
        message: "Success",
      });
    }
    console.log(reservationData);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Singlereservation = async (req, res) => {
  try {
    const reservationId = req.params.reservation_id;
    const reservationData = await ReservationModel.findOne({ _id: reservationId });
    if (reservationData) {
      return res.status(200).json({
        data: reservationData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Updatereservation = async (req, res) => {
  try {
    const {fname, lname, email, contact,date, time,partysize,specialrequests, status } = req.body;
    const reservationId = req.params.reservation_id;
    const reservationData = await ReservationModel.findOne({ _id: reservationId });
    if (!reservationData) {
      return res.status(404).json({
        message: 'Reservation not found',
      });
    }
    const Updatedreservation = await ReservationModel.updateOne(
      { _id: reservationId },
      {
        $set: {
          fname: fname,
          lname: lname,
          email: email,
          contact: contact,
          date: date,
          time: time,
          partysize: partysize,
          specialrequests: specialrequests,
          status: status
        },
      }
    );
    if (Updatedreservation.acknowledged) {
      return res.status(200).json({
        data: Updatedreservation,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deletereservation = async (req, res) => {
  try {
    const reservationId = req.params.reservation_id;
    const Deletedreservation = await ReservationModel.deleteOne({ _id: reservationId });
    if (Deletedreservation.acknowledged) {
      return res.status(200).json({
        message: "Data Successfully deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

import BillModel from "../Models/BillModel";

export const Addbilling = async (req, res) => {
  try {
    const {
      orderId,
      subtotal,
      tax,
      discount,
      totalAmount,
      paymentMethod,
      billingAddress,
      invoiceNumber,
    } = req.body;

    const BillData = new BillModel({
      orderId: orderId,
      subtotal: subtotal,
      tax: tax,
      discount: discount,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      billingAddress: billingAddress,
      invoiceNumber: invoiceNumber,
    });

   BillData.save()
   if(BillData){
    return res.status(201).json({
       data: BillData,
       message: 'Bill created successfully'
       });    
   }
  } catch (error) {
   return  res.status(500).json({
     message: error.message 
    });
  }
};


export const updatebill = async (req, res) => {
    try {
      const {
        orderId,
        subtotal,
        tax,
        discount,
        totalAmount,
        paymentMethod,
        billingAddress,
        invoiceNumber,
      } = req.body;
  
      const billId = req.params.bill_id;
      const BillData = await BillModel.findOne({ _id: billId });
      if (!BillData) {
        return res.status(404).json({
          message: 'Reservation not found',
        });
      }
      const UpdatedBill = await BillModel.updateOne(
        { _id: billId },
        {
          $set: {
            orderId: orderId,
            subtotal: subtotal,
            tax: tax,
            discount: discount,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            billingAddress: billingAddress,
            invoiceNumber: invoiceNumber,
          },
        }
      );
      if (UpdatedBill.acknowledged) {
        return res.status(200).json({
          data: UpdatedBill,
          message: "Updated Successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
};

export const getbill = async (req, res) => {
  try {
    const billId = req.params.billId;
   const BillData = await BillModel.findOne({ _id: billId});
    if (BillData) {
      return res.status(200).json({
        data: BillData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const updatePaymentStatus = async (req, res) => {
  try {
    const billId = req.params.billId;
    const { paymentStatus } = req.body;

    const UpdatedBill = await BillModel.updateOne(
      billId,
      { paymentStatus },
      { new: true }
    );

    if (!UpdatedBill) {
      return res.status(404).json({
        message: 'Bill not found' 
      });
    }

    if(UpdatedBill){
      res.status(200).json({
        data: UpdatedBill, 
        message: 'Payment status updated successfully'
       });
    }
  } catch (error) {
    return res.status(500).json({
       message: error.message 
      });
  }
};

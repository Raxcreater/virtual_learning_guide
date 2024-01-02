const adminModel= require('./Model/admin')
const merge_query= require('./query')
const saveAdmin = async (req, res) => {
    try {
      console.log("checkinnnnnnnnn");7
      let findAdmin = await merge_query.get_data(
        adminModel,
        { email: "admin@gmail.com" },
        { _id: 1 },
        { lean: true }
      );
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", findAdmin);
      if (!findAdmin.length) {
        let saveData = [
          {
            name: "admin",
            email: "admin@gmail.com",
            password: "qwerty",
            deviceType: "ANDROID",
            deviceToken: null,
            tokenGenerateAt: +new Date()
  
          },
          {
            name: "admin2",
            email: "admin2@gmail.com",
            password: "qwerty",
            deviceType: "ANDROID",
            deviceToken: null,
            tokenGenerateAt: +new Date()
          },
          {
            name: "admin3",
            email: "admin3@gmail.com",
            password: "qwerty",
            deviceType: "ANDROID",
            deviceToken: null,
            tokenGenerateAt: +new Date()
          },
        ];
  
        findAdmin = await merge_query.save_data(adminModel, saveData, { multi: true });
        res.status(200).send(findAdmin)
      }
  
    } catch (err) {
      //  res.status(500).json({ success: false, error: err.message });
      console.log(err, "error");
    }
  };
  module.exports = {
    saveAdmin: saveAdmin,
  };
  
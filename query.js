const get_data =async (model , query , projection , options ) => {
  
          try {

              let fetch_data =  await model.find(query, projection, options);
              return (fetch_data);

          } catch (err) {
                return (err);
          }
    
}
const save_data =  async(model , data ) => {

    
        try {
            let save_info =  await model.create(data);
            return (save_info);
            
        } catch (err) {
            return (err);
            
        }

  }

module.exports = {
    get_data,save_data 
}
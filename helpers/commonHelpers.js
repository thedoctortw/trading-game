exports.DBCreate = async (dbObject, param) => {
    var result;
    await dbObject.create(param)
        .then(data => {
            result = {
                success: true,
                data: data
            };
        }).catch(err => {
            result = {
                success: false,
                message: err.message || "Some error occurred while creating the User."
            };
        });
    return result;
};

exports.DBUpdate = async (dbObject, params) => {
    var result;
    var id = params.id;
    var body = params.body;

    await dbObject.update(body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            result = {
                success: true,
                message: "User was updated successfully."
            };
          } else {
            result = {
                success: false,
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            };
          }
        })
        .catch(err => {
            result = {
                success: false,
                message: "Error updating User with id=" + id +" :" + err
            };
        });
    return result;
};

exports.DBDelete = async (dbObject, id) => {
    var result;
    dbObject.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            result = {
                success: true,
                message: "User was deleted successfully!"
            };
          } else {
            result = {
                success: false,
                message: `Cannot delete User with id=${id}. Maybe User was not found!`
            };
          }
        })
        .catch(err => {
            result = {
                success: false,
                message: "Could not delete User with id=" + id
            };  
        });
    return result;
}

exports.DBFindOne = async (dbObject, id) => {
    var result;
    await dbObject.findByPk(id)
        .then(data => {
            if (data) {
                result = {
                    success: true,
                    data: data
                };
            } else {
                result = {
                    success: false,
                    message: `Cannot find Share with id=${id}.`
                };
            }
        })
        .catch(err => {
            result = {
                success: false,
                message: "Error retrieving Share with id=" + id
            };
        });
    return result;
}
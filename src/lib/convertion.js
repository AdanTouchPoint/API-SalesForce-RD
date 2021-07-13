// const Sequelize = require("sequelize"),
//     Op = Sequelize.Op,
//     cryptoRandomString = require('crypto-random-string'),
//     {logError} = require('../lib/core'),
//     model = require('../models/convertion_3services');
//
// class Convertion {
//     static getById = async (id) => {
//         try {
//             let data = await model.Convertion_3Services.findOne({
//                 where: {id}
//             });
//             return data;
//         } catch (error) {
//             logError(error, 'WYD4T4D8');
//         }
//     };
//
//     static getByEmail = async (email) => {
//         try {
//
//             let data = await model.Convertion_3Services.findOne({
//                 where: {email}
//             });
//             if (data) data = data.get({plain: true});
//             return data;
//         } catch (error) {
//             logError(error, 'PEC0D28C');
//         }
//     };
//
//     static getByPhone = async (phone) => {
//         try {
//
//             let data = await model.Convertion_3Services.findOne({
//                 where: {phone}
//             });
//             if (data) data = data.get({plain: true});
//             return data;
//         } catch (error) {
//             logError(error, '54UM1DEY');
//         }
//     };
//
//     static processFilter(filter) {
//         let where = {};
//         for (let x in filter) switch (x) {
//             case 'query':
//                 where = {
//                     ...where,
//                     [Op.and]: filter.query.trim().split(' ').map(query => ({
//                         [Op.or]: [
//                             {
//                                 lastName: {
//                                     [Op.like]: `%${query}%`
//                                 }
//                             },
//                             {
//                                 firstName: {
//                                     [Op.like]: `%${query}%`
//                                 }
//                             }
//                         ]
//                     }))
//                 };
//                 break;
//             case 'id':
//                 if (filter.id) if (filter.id.length > 0) where.id = {[Op.in]: filter.id};
//                 break;
//             case 'type':
//                 if (filter.type) if (filter.type.length) where.typeId = {[Op.in]: filter.type}
//                 break;
//         }
//         return where;
//     }
//
//     static count = async (filter) => {
//         try {
//             if (!filter) filter = {};
//
//             let data = await model.Convertion_3Services.count({
//                 where: this.processFilter(filter)
//             });
//             return data;
//         } catch (error) {
//             logError(error, 'PU58U55Y');
//         }
//     };
//
//     static list = async (filter, options) => {
//         try {
//             if (!filter) filter = {};
//             if (!options) options = {};
//
//             const where = this.processFilter(filter),
//                 order = options.ord ? [[options.ord, options.asc ? 'ASC' : 'DESC']] : [['updatedAt', 'DESC']],
//                 limit = options.num || 20,
//                 offset = (options.pag || 0) * limit;
//             let data = await model.Convertion_3Services.findAll({
//                 where, limit, offset, order
//             });
//             data = data.map(x => x.get({plain: true}));
//             return data;
//         } catch (error) {
//             logError(error, 'IDFMPKX7');
//         }
//     };
//
//     static create = async (input) => {
//         try {
//             if (!input.id) input.id = cryptoRandomString({type: 'url-safe', length: 10})
//             if (input.convertion_3services) input.convertion_3services.Id = input.convertion_3services.id;
//             console.log(input)
//             const prev = await this.getById(input.id);
//             if (prev) throw new Error(`El usuario ${input.id} ya existe, use otro ID`)
//             // const prevs = await this.getByEmail(input.email);
//             // if (prevs) throw new Error(`El usuario ${input.email} ya existe, use otro email`);
//             await model.Convertion_3Services.create(input);
//             const data = await this.getById(input.id);
//             return data;
//         } catch (error) {
//             logError(error, '1DR58ED5');
//         }
//     };
//
//     static updates = async (id,convertionData) => {
//         try {
//             const prev = await this.getById(id);
//             if (!prev) throw new Error(`El usuario ${id} no existe`);
//             await model.Convertion_3Services.update(convertionData, {where: {id: id}});
//             const data = await this.getById(id);
//             return data;
//         } catch (error) {
//             logError(error, 'K1MW4UMT');
//         }
//     };
//
//     static delete = async (id) => {
//         try {
//             const prev = await this.getById(id);
//             if (!prev) return false;
//             await model.Convertion_3Services.destroy({where: {id}});
//             return true;
//         } catch (error) {
//             logError(error, '0THYPXXT');
//         }
//     };
// }
//
// module.exports = {
//     Convertion
// };

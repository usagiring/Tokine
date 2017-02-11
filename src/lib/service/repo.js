/**
 * Created by RedMoon on 2017/2/7.
 */

module.exports = {
    save,
    create,
    count,
    find,
    findById,
    aggregate,
    findByIdAndRemove,
    findByIdAndUpdate,
    findOne,
    findOneAndUpdate,
    insertMany,
    mapReduce,
    remove,
    update,
    queryExec
};

function save(model, data) {
    return model.save(data);
}

function create(model, data) {
    return model.create(data);
}

function count(model, where) {
    return model.count(where);
}

function find(model, where, projection = null) {
    return model.find(where, projection);
}

function findById(model, id, projection = null) {
    return model.findById(id, projection);
}

function aggregate(model, aggregate) {
    return model.aggregate(aggregate);
}

function findByIdAndRemove(model, id) {
    return model.findByIdAndRemove(id);
}

function findByIdAndUpdate(model, id, data, options) {
    return model.findByIdAndUpdate(id, data, options);
}

function findOne(model, where) {
    return model.findOne(where);
}

function findOneAndUpdate(model, where, data, options) {
    return model.findOneAndUpdate(where, data, options);
}

function insertMany(model, data) {
    return model.insertMany(data);
}

function mapReduce(model, map, reduce) {
    let o = {
        map,
        reduce
    };
    return model.mapReduce(o);
}

function remove(model, where) {
    return model.remove(where);
}

function update(model, where, data, options) {
    return model.update(where, data, options);
}

function queryExec(query, limit, skip, select, sort) {
    if (select) {
        query.select(select);
    }
    if (sort) {
        query.sort(sort);
    }
    if (skip && skip > 0) {
        query.skip(skip);
    }
    if (limit && limit > 0) {
        query.limit(limit);
    }
    return query.exec();
}
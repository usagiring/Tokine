export function dropSpace(str) {
  //      this.tools.dropSpace(e)
  return str.replace(/\s+/g, '');
}

/*
name: String // 'user'
where: String or Object // 'username: "test",uid:1' or {username: "test",uid:1}
projection: String // _id,username
 */
export function graphql(name, where, projection) {
  if (typeof where === 'object') {
    where = JSON.stringify(where)
    where = where.substring(1, where.length - 1)
  }
  if (projection.include('_id') === -1) {
    projection += ',_id'
  }
  return `{${name}(${where}){${projection}}}`

}

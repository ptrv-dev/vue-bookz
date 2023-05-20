/**
 * @param {number | Date} from
 * @param {number | Date} to
 */
function getDates(from, to) {
  if (typeof from === 'number') from = new Date(from);
  if (typeof to === 'number') to = new Date(to);
  if (!from instanceof Date || !to instanceof Date) throw TypeError();

  const result = [];
  while (from.toLocaleDateString('ru-RU') > to.toLocaleDateString('ru-RU')) {
    result.push(from.toLocaleDateString('ru-RU'));
    from.setDate(from.getDate() - 1);
  }
  return result;
}

export default getDates;

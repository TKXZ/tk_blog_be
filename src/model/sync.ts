/**
 * @author tkwang
 * @description 同步数据表 可能具有破坏性,谨慎使用
 */
import Article from './article.model'

function syncDatabaseTable(type = '') {
  try {
    if (type === '') {
      Article.sync()
    } else if (type === 'force') {
      // 强制使用当前 Model 建立新表
      Article.sync({ force: true })
    }
  } catch (err: any) {
    console.error('同步数据表错误', err.message)
  }
}

export { syncDatabaseTable }

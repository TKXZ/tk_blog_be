import type { Tokens } from "marked";
import type { Catalog } from "./types/extention";
import marked from ".";

interface ExtentionParsedMd {
  catalogArr: Catalog[],
}

/**
 * 处理 md 字符串入口
 * @param mdStr 
 * @returns 
 */
export const resolveMdStr = async (mdStr: string): Promise<ExtentionParsedMd> => {
  const catalogArr = await parseCatalog(mdStr);

  return {
    catalogArr,
  }
}

/**
 * 解析 md 目录
 * @param mdStr 
 */
const parseCatalog = async (mdStr: string): Promise<Catalog[]> => {
  const tokens = marked.lexer(mdStr);
  let catalogArr = null;
  catalogArr = tokens.filter((val, index) => {
    return val.type === 'heading';
  }) as Tokens.Heading[];

  return layerCatalog(catalogArr);
}

/**
 * 目录分层
 * @param arr 
 * @returns 
 */
const layerCatalog = (arr: Tokens.Heading[]): Catalog[] => {
  let res: Catalog[] = [];
  let firstDepth = arr[0].depth;
  let curDepth: number = 1;
  let curDepthCatalog: Catalog | null = null;
  let stack: Catalog[] = [];

  // 分层 - 非递归
  function core(parent: Catalog[], item: Tokens.Heading) {
    stack.push(item);

    if (item.depth === firstDepth) {
      parent.push(item);
      curDepthCatalog = item;
      curDepth = firstDepth;
    } else if (item.depth > curDepth && curDepthCatalog != null) {
      curDepthCatalog.children = [] as Catalog[];
      curDepthCatalog.children.push(item);
      curDepth = item.depth;
      curDepthCatalog = item;
    } else {
      let index = stack.length - 1;
      while (stack[index].depth >= item.depth) {
        index--;
      }
      stack[index]?.children?.push(item);
      curDepthCatalog = item;
      curDepth = item.depth;
    }
  }

  try {
    arr.forEach(item => {
      core(res, item);
    })
  } catch (err: any) {
    console.error('目录分层错误', err)
  }

  return res;
}

export { Catalog };

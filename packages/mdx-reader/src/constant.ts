/**
 * Regular expression to strip key if dictionary's "StripKey" attribute is true. 
 */
export const REGEXP_STRIPKEY: Record<string, RegExp> = {
'mdx' : /[()., '/\\@_-]()/g,
'mdd' : /([.][^.]*$)|[()., '/\\@_-]/g
}

export const UNDEFINED = void 0;
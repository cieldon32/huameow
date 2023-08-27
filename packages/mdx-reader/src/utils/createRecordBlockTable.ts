/*
 * Create a Record Block Table object to load record block info from record section in mdx/mdd file.
 * Retrived data is stored in an Uint32Array which contains N pairs of (offset_comp, offset_decomp) value,
 * where N is number of record blocks.
 *
 * When looking up a given key for its definition:
 *   1. Search KEY_INDEX to locate keyword block containing the given key.
 *   2. Scanning the found keyword block to get its record offset and size.
 *   3. Search RECORD_BLOCK_TABLE to get record block containing the record.
 *   4. Load the found record block, using its offset and size to retrieve record content.
 *
 * @see https://github.com/zhansliu/writemdict/blob/master/fileformat.md#record-section
 */
export function createRecordBlockTable() {
  let pos = 0, // current position
      arr: any;     // backed Uint32Array
  return {
      // Allocate required ArrayBuffer for storing record block table, where len is number of record blocks.
      alloc: function (len: number) {
          arr = new Uint32Array(len * 2);
      },
      // Store offset pair value (compressed & decompressed) for a record block
      // NOTE: offset_comp is absolute offset counted from start of mdx/mdd file.
      put: function (offset_comp: any, offset_decomp: any) {
        if(arr) {
          arr[pos++] = offset_comp;
          arr[pos++] = offset_decomp;
        }

      },
      // Given offset of a keyword after decompression, return a record block info containing it, else undefined if not found.
      find: function (keyAt: number) {
          let hi = (arr.length >> 1) - 1, lo = 0, i = (lo + hi) >> 1, val = arr[(i << 1) + 1];

          if (keyAt > arr[(hi << 1) + 1] || keyAt < 0) return;

          while (true) {
              if (hi - lo <= 1) {
                  if (i < hi) {
                      return {
                          block_no: i,
                          comp_offset: arr[i <<= 1],
                          comp_size: arr[i + 2] - arr[i],
                          decomp_offset: arr[i + 1],
                          decomp_size: arr[i + 3] - arr[i + 1]
                      };
                  } else {
                      return;
                  }
              }

              (keyAt < val) ? hi = i : lo = i;
              i = (lo + hi) >> 1;
              val = arr[(i << 1) + 1];
          }
      },
      get: function() {
          return arr;
      }
  };
}

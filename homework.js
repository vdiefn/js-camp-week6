// ========================================
// 第六週作業：電商 API 資料串接練習
// 執行方式：node homework.js
// 環境需求：Node.js 18+（內建 fetch）
// ========================================

// 載入環境變數
require("dotenv").config({ path: ".env" });

// API 設定（從 .env 讀取）
const API_PATH = process.env.API_PATH;
const BASE_URL = "https://livejs-api.hexschool.io";
const ADMIN_TOKEN = process.env.API_KEY;

// ========================================
// 任務一：基礎 fetch 練習
// ========================================

/**
 * 1. 取得產品列表
 * 使用 fetch 發送 GET 請求
 * @returns {Promise<Array>} - 回傳 products 陣列
 */
async function getProducts() {
  try {
    const response = await fetch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`,
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 2. 取得購物車列表
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function getCart() {
  try {
    const response = await fetch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
    );
    const data = await response.json();
    const { carts, total, finalTotal } = data;
    return { carts, total, finalTotal };
  } catch (error) {
    console.err(error);
  }
}

/**
 * 3. 錯誤處理：當 API 回傳錯誤時，回傳錯誤訊息
 * @returns {Promise<Object>} - 回傳 { success: boolean, data?: [...], error?: string }
 */
async function getProductsSafe() {
  try {
    const response = await fetch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`,
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message,
      };
    }
    return {
      success: true,
      data: data.products,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// 任務二：POST 請求 - 購物車操作
// ========================================

/**
 * 1. 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  // 提示：
  // 1. 發送 POST 請求
  // 2. body 格式：{ data: { productId: "xxx", quantity: 1 } }
  // 3. 記得設定 headers: { 'Content-Type': 'application/json' }
  // 4. body 要用 JSON.stringify() 轉換
  try {
    const response = await fetch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
      {
        method: "POST",
        body: JSON.stringify({
          data: {
            productId,
            quantity,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        succrss: false,
        error: data.message,
      };
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 2. 編輯購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  // 提示：
  // 1. 發送 PATCH 請求
  // 2. body 格式：{ data: { id: "購物車ID", quantity: 數量 } }
  try {
    const response = await fetch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
      {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            id: cartId,
            quantity,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message,
      };
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 3. 刪除購物車特定商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function removeCartItem(cartId) {
  // 請實作此函式
  // 提示：發送 DELETE 請求到 /carts/{id}
  try {
    const response = await fetch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message,
      };
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 4. 清空購物車
 * @returns {Promise<Object>} - 回傳清空後的購物車資料
 */
async function clearCart() {
  // 請實作此函式
  // 提示：發送 DELETE 請求到 /carts
  try {
    const response = await fetch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
      {
        method: "DELETE",
      },
    );
    const data = response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message,
      };
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ========================================
// HTTP 知識測驗 (額外練習)
// ========================================

/*
請回答以下問題（可以寫在這裡或另外繳交）：

1. HTTP 狀態碼的分類（1xx, 2xx, 3xx, 4xx, 5xx 各代表什麼）
  答：
  1XX: 代表資訊回應
  2XX: 代表成功
  3XX: 代表重新導向
  4XX: 代表使用者端的錯誤
  5XX: 代表伺服器端的錯誤

2. GET、POST、PATCH、PUT、DELETE 的差異
  答：
  GET: 取得資料
  POST: 新增資料
  PATCH: 局部資料更新
  PUT: 全部資料更新
  DELETE: 資料刪除

3. 什麼是 RESTful API？
  答：
  RESTful API 代表的是一種api的style，而不是一種標準。主要是透過HTTP的動詞(GET、POST、PATCH、PUT、DELETE)進行資料的CRUD操作，舉例來說：
  新增一筆todo: POST /todos
  取得todo資料: GET /todos
  修改某筆todo的部分資料: PATCH /todos/:id
  修改某筆todo的資料: PUT /todos/:id
  刪除某筆todo的資料: DELETE /todos/:id
*/

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
  API_PATH,
  BASE_URL,
  ADMIN_TOKEN,
  getProducts,
  getCart,
  getProductsSafe,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};

// ========================================
// 直接執行測試
// ========================================
if (require.main === module) {
  async function runTests() {
    console.log("=== 第六週作業測試 ===\n");
    console.log("API_PATH:", API_PATH);
    console.log("");

    if (!API_PATH) {
      console.log("請先在 .env 檔案中設定 API_PATH！");
      return;
    }

    // 任務一測試
    console.log("--- 任務一：基礎 fetch ---");
    try {
      const products = await getProducts();
      console.log(
        "getProducts:",
        products ? `成功取得 ${products.length} 筆產品` : "回傳 undefined",
      );
    } catch (error) {
      console.log("getProducts 錯誤:", error.message);
    }

    try {
      const cart = await getCart();
      console.log(
        "getCart:",
        cart ? `購物車有 ${cart.carts?.length || 0} 筆商品` : "回傳 undefined",
      );
    } catch (error) {
      console.log("getCart 錯誤:", error.message);
    }

    try {
      const result = await getProductsSafe();
      console.log(
        "getProductsSafe:",
        result?.success ? "成功" : result?.error || "回傳 undefined",
      );
    } catch (error) {
      console.log("getProductsSafe 錯誤:", error.message);
    }

    console.log("\n=== 測試結束 ===");
    console.log("\n提示：執行 node test.js 進行完整驗證");
  }

  runTests();
}

const appState = {
  title: {
    text: "React.js 小书",
    color: "red"
  },
  content: {
    text: "React.js 小书内容",
    color: "blue"
  }
};

function createStore (reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
      state = reducer(state, action)
      listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
  }

function stateChanger (state, action) {
    if(!state) {
        return {
            title: {
                text: "React.js 小书",
                color: "red"
              },
              content: {
                text: "React.js 小书内容",
                color: "blue"
              }
        }
    }
    switch (action.type) {
      case 'UPDATE_TITLE_TEXT':
        return {
            ...state,
            title: {
                ...state.title,
                text: action.text
            }
        }
      case 'UPDATE_TITLE_COLOR':
        return {
            ...state,
            title: {
                ...state.title,
                color: action.color
            }
        }
      default:
        return state
    }
  }

function renderApp(newState, oldState = {}) {
    if(newState === oldState) return
    console.log('render app...')
  renderTitle(newState.title, oldState.title)
  renderContent(newState.content, oldState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return
    console.log('render title...')
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
    if (newContent=== oldContent) return 
    console.log('render content...')
  const contentDOM = document.getElementById("content");
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

const store = createStore(appState, stateChanger)
let oldState = store.getState()
store.subscribe(() => renderApp(store.getState(), oldState))


renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色

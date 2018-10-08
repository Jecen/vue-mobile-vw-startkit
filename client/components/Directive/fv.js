class Fv {
  //构造函数，初始化类名
  constructor(conf = {
    inputFailedClass: 'fv-input-fail',
    msgFailedClass: 'fv-msg-fail'
  }) {
    this.class = {
      inputFailed: conf.inputFailedClass,
      msgFailed: conf.msgFailedClass
    }
  }

  addClass(el, className) {
    let classArr = el.className.split()
    if (classArr.indexOf(className) === -1) {
      classArr.push(className)
      el.className = classArr.join(' ')
    }
  }

  removeClass(el, className) {
    let reg = new RegExp(`(\\s${className}|${className}\\s)`, 'g')
    el.className = el.className.replace(reg, '')
  }

  //原型共享方法，不要用this绑定到实例上
  getReg(opt, req_msg) {
    const regs = {
      required: {
        message: req_msg || '不能为空',
        reg: /\S/
      },
      number: {
        message: '只能输入数字',
        reg: /^\d+$/
      },
      email: {
        message: '格式错误',
        reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      },
      mobile: {
        message: '格式错误',
        reg: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      },
      identity: {
        message: '格式错误',
        reg: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      },
      postcode: {
        message: '格式错误',
        reg: /^[1-9]\d{5}(?!\d)$/
      }
    }

    return regs[opt]
  }

  getCheckers(opts, regs, req_msg) {
    let regList = []
    let tmpReg = null

    //遍历预置规则列表，将匹配的正则添加到正则列表
    for (let opt of Object.keys(opts)) {
      tmpReg = this.getReg(opt, req_msg)

      tmpReg && regList.push(tmpReg)
    }

    //将传入的正则加入正则列表
    if (regs) {
      regs.map((info) => {
        regList.push({
          message: info.msg || '格式错误',
          reg: info.reg
        })
      })
    }

    return regList
  }

  check({ opts, regs, value = '', other, len_msg, req_msg }) {
    const checkers = this.getCheckers(opts, regs, req_msg)
    const checkerTpl = { message: '' }
    let rst = false

    value = value.trim()
    //允许为空 && 值为空则直接校验成功
    if (other.allowEmpty && !value.length) {
      return { success: true }
    }

    //如果设置了长度参数则添加长度验证规则
    other.maxLength > 0 && other.minLength >= 0 && checkers.push({
      message: len_msg.replace('{0}', other.minLength).replace('{1}', other.maxLength) || `长度需介于${other.minLength}-${other.maxLength}之间`,
      reg: new RegExp(`^\\S{${other.minLength},${other.maxLength}}$`)
    })

    for (let checker of checkers) {
      rst = Object.prototype.toString.apply(checker.reg) === '[object RegExp]' ?
        checker.reg.test(value) : false

      if (!rst) {
        return { success: false, checker: checker }
      }
    }

    return { success: true }
  }

  handleRst(el, title, rst, node) {
    const id = el.getAttribute('id')
    const inputClass = this.class.inputFailed


    rst.id = id

    if (rst.success) {
      this.removeClass(el, inputClass)

      for (let index in node.$fv.errors) {
        if (node.$fv.errors[index].id === rst.id) {
          node.$fv.errors.splice(index, 1)
          break
        }
      }
    } else {
      let isInList = false

      this.addClass(el, inputClass)

      for (let index in node.$fv.errors) {
        if (node.$fv.errors[index].id === id) {
          isInList = true
          node.$fv.errors[index] = rst
          break
        }
      }
      !isInList && node.$fv.errors.push(rst)
    }

    rst.title = title
    node.$emit(`fv-${id}-update`, rst)
  }

  install(Vue, opt) {
    const _this = this
    this.opt = opt

    Vue.directive('fv-check', {
      bind(el, binding, vnode) {
        const node = vnode.context
        const title = binding.value.title || ''
        const id = el.getAttribute('id')
        let opts = binding.modifiers
        let regs = binding.value.reg || []
        if (typeof regs === 'string') {
          regs = [`${regs}`]
        }

        const other = {
          allowEmpty: binding.value.allowEmpty ? binding.value.allowEmpty : false,
          maxLength: binding.value.max > 0 ? binding.value.max : -1,
          minLength: binding.value.min >= 0 ? binding.value.min : -1
        }

        if (binding.value.rules) {
          binding.value.rules.map((rule) => {
            opts[rule] = true
          })
        }

        let isInList = false

        for (let nd of node.$fv.nodes) {
          if (nd.id === id) {
            isInList = true
            nd.node = node
            break
          }
        }
        !isInList && node.$fv.nodes.push({
          id: id,
          node: node
        })

        const checkHandler = () => {
          const rst = _this.check({ opts: opts, regs: regs, value: el.value, other: other, len_msg: binding.value.len_msg, req_msg: binding.value.req_msg })
          _this.handleRst(el, title, rst, node)
        }

        el.addEventListener('change', checkHandler)
        node.$on('check', checkHandler)
      }
    })

    Vue.directive('fv-msg', {
      bind(el, binding, vnode) {
        const arg = { el: el, bd: binding, n: vnode }
        window.arg = arg

        const node = vnode.context
        const id = binding.value
        const msgClass = _this.class.msgFailed
        node.$on(`fv-${id}-update`, (rst) => {
          if (rst.success) {
            _this.removeClass(el, msgClass)
            el.style.display = "none"
          } else {
            _this.addClass(el, msgClass)
            // el.innerText = `${rst.title}${rst.checker.message}`  
            el.innerText = `${rst.checker.message}`
            el.style.display = 'block'
          }
        })
      }
    })

    Vue.prototype.$fv = {
      nodes: [],
      errors: [],
      checkAll(group, cb) {
        this.errors = []
        for (let nd of this.nodes) {
          if (group !== '' && nd.id.split('-')[0] === group) {
            nd.node.$emit('check')
          } else if (group === '' || !group) {
            nd.node.$emit('check')
          }
        }
        cb && cb(this.errors)
      },
      currentMsg(name, cname, msg, cb) {
        for (let nd of this.nodes) {
          if (nd.id.indexOf(name) >= 0) {
            nd.node.$emit(`fv-${nd.id}-update`, { success: false, title: cname, checker: { message: msg } })
          }
        }
        cb && cb()
      }
    }
  }


}

export default Fv

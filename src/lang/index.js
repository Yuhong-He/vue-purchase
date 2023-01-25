// 1.import library
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import myZh from './myZh'
import myEn from './myEn'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

// 2.config language
const messages = {
  myEn: {
    ...myEn,
    ...enLocale
  },
  myZh: {
    ...myZh,
    ...zhLocale
  }
}

// 3. setting language
const i18n = new VueI18n({
  locale: 'myZh',
  messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value))

// 4.export i18n
export default i18n;

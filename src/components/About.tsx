import { useState } from 'react';
import { ArrowLeft, Mail, Globe, Phone, MapPin, ChevronRight } from 'lucide-react';
import touristaLogo from '/tourista-app-icon.png';
import type { Screen } from '../App';

interface AboutProps {
  onNavigate: (screen: Screen) => void;
  language: string;
}

export function About({ onNavigate, language }: AboutProps) {
  const [activeLanguage, setActiveLanguage] = useState(language === 'zh' ? 'zh' : 'en');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('profile')}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">About</h1>
            <p className="text-blue-100 text-sm">Learn more about Tourista AR</p>
          </div>
        </div>
        
        {/* Language Toggle */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setActiveLanguage('en')}
            className={`flex-1 py-2 rounded-xl font-semibold transition ${activeLanguage === 'en' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLanguage('zh')}
            className={`flex-1 py-2 rounded-xl font-semibold transition ${activeLanguage === 'zh' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}
          >
            中文
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
            <img src={touristaLogo} alt="Tourista AR" className="w-24 h-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">Tourista AR</h2>
          <p className="text-center text-gray-600 text-sm">
            {activeLanguage === 'en' 
              ? 'Connecting China & the World Travel, Trade & Technology.'
              : '中非链接，智创未来'}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button 
            onClick={() => scrollToSection('mission')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <span className="font-semibold">{activeLanguage === 'en' ? 'Our Mission' : '我们的使命'}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <div className="border-t border-gray-100"></div>
          <button 
            onClick={() => scrollToSection('company')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <span className="font-semibold">{activeLanguage === 'en' ? 'Who We Are' : '关于我们'}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <div className="border-t border-gray-100"></div>
          <button 
            onClick={() => scrollToSection('services')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <span className="font-semibold">{activeLanguage === 'en' ? 'What We Do' : '我们的核心服务'}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <div className="border-t border-gray-100"></div>
          <button 
            onClick={() => scrollToSection('vision')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <span className="font-semibold">{activeLanguage === 'en' ? 'Our Vision' : '我们的愿景'}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <div className="border-t border-gray-100"></div>
          <button 
            onClick={() => scrollToSection('team')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <span className="font-semibold">{activeLanguage === 'en' ? 'Our Team' : '我们的团队布局'}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <div className="border-t border-gray-100"></div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <span className="font-semibold">{activeLanguage === 'en' ? 'Contact Us' : '联系我们'}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Mission Section */}
        <section id="mission" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">
            {activeLanguage === 'en' ? 'Our Mission' : '我们的使命'}
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              {activeLanguage === 'en' ? 
                'We are a China-Africa super app, born from the vision to break down barriers between China and other counties in tourism and cross-border trade. Leveraging Augmented Reality (AR) and Artificial Intelligence (AI), we create a seamless, all-in-one platform that empowers travelers, businesses, and suppliers to connect, collaborate, and thrive — making China-Africa travel and trade simpler, smarter, and more accessible for everyone.'
                :
                '作为深耕中非的超级应用平台，智旅境以打破跨境壁垒为初心，聚焦中非文旅与跨境贸易双向链接。依托增强现实（AR）与人工智能（AI）技术，打造一站式服务生态，让中非旅行者、企业与供应商高效对接、协同发展，让中非文旅交流与贸易合作更简单、更智能、更普惠。'
              }
            </p>
          </div>
        </section>

        {/* Company Profile Section */}
        <section id="company" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">
            {activeLanguage === 'en' ? 'Who We Are' : '关于我们'}
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {activeLanguage === 'en' ? 
                'Tourista AR is operated by Shanghai Lvjing Intelligent Technology Co., Ltd., a Shanghai-based tech enterprise with a local operational team in Zimbabwe (Chinzimbo Trading Co.) and deep partnerships across Southern Africa. Our team brings together cross-border experts in tourism, trade, logistics, and technology — with 30 core members in China (founders & shareholders) and 80 local professionals in Africa, all dedicated to understanding and serving the unique needs of the China-Africa market.'
                :
                '智旅境由上海旅境智能科技有限公司独立运营，是扎根上海、布局非洲的科技型企业，在津巴布韦设有本地运营团队（津津博贸易有限公司），并与南部非洲多国建立深度合作。我们的团队汇聚中非文旅、跨境贸易、物流与科技领域的跨境专家——中国区3名核心创始股东+非洲区8名本地专业运营人员，深耕本土市场，精准把握中非双向需求。'
              }
            </p>
            <p className="text-gray-700 leading-relaxed">
              {activeLanguage === 'en' ? 
                'We don\'t just build an app; we build a sustainable bridge — combining localized on-the-ground support in Africa with Chinese manufacturing, supply chain, and tech innovation to drive mutual growth for both regions.'
                :
                '我们不止于打造一款应用，更致力于搭建中非可持续发展的链接桥梁：以非洲本地落地服务为根基，结合中国智造、供应链与技术创新，赋能中非双向市场共生共荣。'
              }
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">
            {activeLanguage === 'en' ? 'What We Do' : '我们的核心服务'}
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {activeLanguage === 'en' ? 'For Travelers' : '为旅行者'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {activeLanguage === 'en' ? 
                  'AR-powered destination previews, personalized China-Africa tour planning, one-stop booking, and local cultural support — making your cross-border travel experience immersive and hassle-free.'
                  :
                  'AR沉浸式目的地预览、个性化中非文旅规划、一站式预订服务与本地人文支持，让跨境旅行体验更沉浸、更省心。'
                }
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {activeLanguage === 'en' ? 'For Businesses & Suppliers' : '为企业与供应商'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {activeLanguage === 'en' ? 
                  'B2B cross-border trade matching, direct sourcing from Chinese manufacturers, end-to-end logistics coordination (via our African local team), and AR product showcases — simplifying China-Africa trade from sourcing to delivery.'
                  :
                  'B2B跨境贸易精准匹配、中国厂商直采对接、非洲本地端到端物流协同（津津博团队全程落地）、AR产品实景展示，让中非贸易从采购到交付全流程更高效。'
                }
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {activeLanguage === 'en' ? 'For Partners' : '为合作方'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {activeLanguage === 'en' ? 
                  'Customized dashboards for tourism agencies and suppliers, AI-driven demand forecasting, and localized marketing support — helping you scale your business across China and Africa.'
                  :
                  '文旅机构/供应商专属智能管理后台、AI需求预测、本土化营销支持，助力合作伙伴深耕中非双向市场，实现业务增长。'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">
            {activeLanguage === 'en' ? 'Our Vision' : '我们的愿景'}
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {activeLanguage === 'en' ? 
                'We aim to become the leading China-Africa tourism and trade super infrastructure platform — expanding our AR/AI innovation, growing our local teams across Africa, and building a global network that connects more Chinese and African businesses, travelers, and communities.'
                :
                '成为中非文旅贸易领域的领先超级基础设施平台——持续深化AR/AI技术创新，拓展非洲本地运营版图，搭建链接中非、辐射全球的合作网络，让更多中非企业、旅行者与社群实现高效链接。'
              }
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              {activeLanguage === 'en' ? 
                'Our promise: Local expertise, global reach, and tech-driven value for every user.'
                :
                '我们的承诺：以本土深耕的专业能力、全球布局的服务视野、科技驱动的核心价值，赋能每一位用户。'
              }
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">
            {activeLanguage === 'en' ? 'Our Team' : '我们的团队布局'}
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {activeLanguage === 'en' ? 'China HQ' : '中国总部'}
                </h3>
                <p className="text-gray-700">
                  {activeLanguage === 'en' ? 'Shanghai, China (Founders & Core Tech/Trade Team)' : '上海（创始团队 + 核心科技/贸易团队）'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {activeLanguage === 'en' ? 'Africa Operations' : '非洲运营中心'}
                </h3>
                <p className="text-gray-700">
                  {activeLanguage === 'en' ? 'Zimbabwe (Local Logistics, Marketing & Customer Support)' : '津巴布韦（本地物流、市场推广与客户支持）'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {activeLanguage === 'en' ? 'Partnerships' : '合作网络'}
                </h3>
                <p className="text-gray-700">
                  {activeLanguage === 'en' ? 'Southern Africa (Tourism boards, trade councils, local enterprises)' : '南部非洲多国（文旅局、贸易委员会、本土企业）'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">
            {activeLanguage === 'en' ? 'Contact Us' : '联系我们'}
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <a 
              href="mailto:rlangson91@touristaar.com" 
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
            >
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">{activeLanguage === 'en' ? 'Email' : '邮箱'}</h3>
                <p className="text-gray-700">rlangson91@touristaar.com</p>
              </div>
            </a>
            <a 
              href="https://www.touristaar.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
            >
              <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">{activeLanguage === 'en' ? 'Website' : '网站'}</h3>
                <p className="text-gray-700">www.touristaar.co</p>
              </div>
            </a>
            <a 
              href="tel:+8613122312118" 
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
            >
              <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">{activeLanguage === 'en' ? 'WhatsApp/WeChat' : '微信/WhatsApp'}</h3>
                <p className="text-gray-700">+86 13122312118 / +86 18512165002</p>
              </div>
            </a>
            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">{activeLanguage === 'en' ? 'Addresses' : '地址'}</h3>
                <p className="text-gray-700 mb-1">{activeLanguage === 'en' ? 'China: Beijing road Huangpu District Shanghai, China' : '中国：上海市黄浦区北京路'}</p>
                <p className="text-gray-700">{activeLanguage === 'en' ? 'Africa: Shop 1, Q mall Samora and chinhoyi' : '非洲：津巴布韦 Q mall Samora 和 chinhoyi 1号店'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-sm text-gray-600 mb-2">
            © 2026 Shanghai Lvjing Intelligent Technology Co., Ltd. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-600 font-semibold">
            {activeLanguage === 'en' ? 'Tourista AR - Connecting China & Africa' : '智旅境 - 中非链接，智创未来'}
          </p>
        </footer>
      </div>
    </div>
  );
}

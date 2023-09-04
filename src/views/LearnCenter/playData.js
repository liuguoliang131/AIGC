const data = [
  {
    id: 1,
    group: 1,
    name: "AI对话课程",
    cover: "https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_chat_img.png",
    children: [
      {
        id: 1,
        name: "课程介绍和AI使用方法",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/1%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D%E5%92%8CAI%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.mp4",
      },
      {
        id: 2,
        name: "活动策划：如何用AI设计活动内容",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/2%E6%B4%BB%E5%8A%A8%E7%AD%96%E5%88%92%EF%BC%9A%E5%A6%82%E4%BD%95%E7%94%A8AI%E8%AE%BE%E8%AE%A1%E6%B4%BB%E5%8A%A8%E5%86%85%E5%AE%B9.mp4",
      },
      {
        id: 3,
        name: "活动策划：如何用AI指定宣传计划",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/3%E6%B4%BB%E5%8A%A8%E7%AD%96%E5%88%92%EF%BC%9A%E5%A6%82%E4%BD%95%E7%94%A8AI%E5%88%B6%E5%AE%9A%E5%AE%A3%E4%BC%A0%E8%AE%A1%E5%88%92.mp4",
      },
      {
        id: 4,
        name: "市场营销：如何用AI设计广告文案",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/4%E5%B8%82%E5%9C%BA%E8%90%A5%E9%94%80%EF%BC%9A%E5%A6%82%E4%BD%95%E7%94%A8AI%E8%AE%BE%E8%AE%A1%E5%B9%BF%E5%91%8A%E6%96%87%E6%A1%88.mp4",
      },
      {
        id: 5,
        name: "市场营销：如何用AI撰写宣传材料",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/5%E5%B8%82%E5%9C%BA%E8%90%A5%E9%94%80%EF%BC%9A%E5%A6%82%E4%BD%95%E7%94%A8AI%E6%92%B0%E5%86%99%E5%AE%A3%E4%BC%A0%E6%9D%90%E6%96%99.mp4",
      },
      {
        id: 6,
        name: "市场营销：如何用AI生成社交媒体推文",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/6%E5%B8%82%E5%9C%BA%E8%90%A5%E9%94%80%EF%BC%9A%E5%A6%82%E4%BD%95%E7%94%A8AI%E7%94%9F%E6%88%90%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E6%8E%A8%E6%96%87.mp4",
      },
      {
        id: 7,
        name: "行政工作：如何用AI审阅文件内容",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/7%E8%A1%8C%E6%94%BF%E5%B7%A5%E4%BD%9C%EF%BC%9A%E5%A6%82%E4%BD%95%E7%94%A8AI%E5%AE%A1%E9%98%85%E6%96%87%E4%BB%B6%E5%86%85%E5%AE%B9.mp4",
      },
      {
        id: 8,
        name: "日常办公：如何用AI生成工作日报",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83/AI%E5%AF%B9%E8%AF%9D%E8%A7%86%E9%A2%91/8%E6%97%A5%E5%B8%B8%E5%8A%9E%E5%85%AC%EF%BC%9A%E5%A6%82%E4%BD%95%E7%94%A8AI%E7%94%9F%E6%88%90%E5%B7%A5%E4%BD%9C%E6%97%A5%E6%8A%A5.mp4",
      },
    ]
  },
  {
    id: 2,
    group: 2,
    name: "AI绘画课程",
    cover: "https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_draw_img.png",
    children: [
      {
        id: 9,
        name: "用AI美化商业计划书：如何制作是「简约科技风格」的文档封面",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/1.%E7%94%A8AI%E7%BE%8E%E5%8C%96%E5%95%86%E4%B8%9A%E8%AE%A1%E5%88%92%E4%B9%A6%EF%BC%9A%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C%E6%98%AF%E3%80%8C%E7%AE%80%E7%BA%A6%E7%A7%91%E6%8A%80%E9%A3%8E%E6%A0%BC%E3%80%8D%E7%9A%84%E6%96%87%E6%A1%A3%E5%B0%81%E9%9D%A2.mp4",
      },
      {
        id: 10,
        name: "用AI美化培训课件：如何制作「扁平插画风格」的PPT配图",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/2.%E7%94%A8AI%E7%BE%8E%E5%8C%96%E5%9F%B9%E8%AE%AD%E8%AF%BE%E4%BB%B6%EF%BC%9A%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C%E3%80%8C%E6%89%81%E5%B9%B3%E6%8F%92%E7%94%BB%E9%A3%8E%E6%A0%BC%E3%80%8D%E7%9A%84PPT%E9%85%8D%E5%9B%BE.mp4",
      },
      {
        id: 11,
        name: "用AI美化策划方案：如何制作「商务创意风格」的PPT配图",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/3.%E7%94%A8AI%E7%BE%8E%E5%8C%96%E7%AD%96%E5%88%92%E6%96%B9%E6%A1%88%EF%BC%9A%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C%E3%80%8C%E5%95%86%E5%8A%A1%E5%88%9B%E6%84%8F%E9%A3%8E%E6%A0%BC%E3%80%8D%E7%9A%84PPT%E9%85%8D%E5%9B%BE.mp4",
      },
      {
        id: 12,
        name: "用AI助力电商促销：如何制作「国潮风格」的活动促销海报",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/4.%E7%94%A8AI%E5%8A%A9%E5%8A%9B%E7%94%B5%E5%95%86%E4%BF%83%E9%94%80%EF%BC%9A%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C%E3%80%8C%E5%9B%BD%E6%BD%AE%E9%A3%8E%E6%A0%BC%E3%80%8D%E7%9A%84%E6%B4%BB%E5%8A%A8%E4%BF%83%E9%94%80%E6%B5%B7%E6%8A%A5.mp4",
      },
      {
        id: 13,
        name: "用AI助力文化宣传：如何制作「精致唯美风格」的节日海报",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/5.%E7%94%A8AI%E5%8A%A9%E5%8A%9B%E6%96%87%E5%8C%96%E5%AE%A3%E4%BC%A0%EF%BC%9A%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C%E3%80%8C%E7%B2%BE%E8%87%B4%E5%94%AF%E7%BE%8E%E9%A3%8E%E6%A0%BC%E3%80%8D%E7%9A%84%E8%8A%82%E6%97%A5%E6%B5%B7%E6%8A%A5.mp4",
      },
      {
        id: 14,
        name: "用AI助力企业营销：如何制作「赛博朋克风格」的营销物料",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/6.%E7%94%A8AI%E5%8A%A9%E5%8A%9B%E4%BC%81%E4%B8%9A%E8%90%A5%E9%94%80%EF%BC%9A%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C%E3%80%8C%E8%B5%9B%E5%8D%9A%E6%9C%8B%E5%85%8B%E9%A3%8E%E6%A0%BC%E3%80%8D%E7%9A%84%E8%90%A5%E9%94%80%E7%89%A9%E6%96%99.mp4",
      },
      {
        id: 15,
        name: "用AI助力直播运营：如何制作「多种场景」的直播间虚拟背景",
        poster: "",
        path: "http://aigc-img.hanhoukeji.cn/7.%E7%94%A8AI%E5%8A%A9%E5%8A%9B%E7%9B%B4%E6%92%AD%E8%BF%90%E8%90%A5%EF%BC%9A%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C%E3%80%8C%E5%A4%9A%E7%A7%8D%E5%9C%BA%E6%99%AF%E3%80%8D%E7%9A%84%E7%9B%B4%E6%92%AD%E9%97%B4%E8%99%9A%E6%8B%9F%E8%83%8C%E6%99%AF.mp4",
      },
    ]
  },
]
export default data
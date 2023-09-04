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

    ]
  },
]
export default data
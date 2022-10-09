class Article {
    /**
     * Convert markdown text to html
     * Supported markdown syntax:
     * - [link](url)
     * - ![image](url)
     * - \n
     * - #, ##, ###, ####
     * @param markdown
     */
    static simpleMarkdownToHtml(markdown, imgBaseUrl) {
        return markdown
            .replace(/!\[(.+)\]\((.+)\)/g, `<img src="${imgBaseUrl}$2" alt="$1" class="img-fluid py-2">`)
            .replace(/\[(.+)\]\((.+)\)/g, '<a href="$2">$1</a>')
            .replace(/\n/g, '<br>\n')
            .replace(/(#{1,4})(.+)/g, (m, p1, p2) => `<h${p1.length+2}>${p2}</h${p1.length+2}>`);
    }

    constructor(title, content, img, link) {
        const imgBaseURL = "src/image/article/";

        this.title = title;
        this.content = Article.simpleMarkdownToHtml(content, imgBaseURL);
        this.img = imgBaseURL + img;
        this.link = link;
    }
}

class ArticleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            article: props.article
        }
    }

    render() {
        return (
            <div className="modal modal-xl fade" id={"articleModal" + this.state.index} tabIndex="-1" role="dialog"
                 aria-labelledby="articleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            backgroundImage: `url(${this.state.article.img}`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <h3 className="modal-title text-white article-title mt-5 pt-5 px-4"
                                id="articleModalLabel">{this.state.article.title}</h3>
                        </div>
                        <div className="modal-body">
                            <div className="article-body px-4" dangerouslySetInnerHTML={ { __html: this.state.article.content} }></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <a href={this.state.article.link} className="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ArticleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            article: props.article
        }
    }

    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={this.state.article.img} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.article.title}</h5>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target={"#articleModal" + this.props.index}>
                        阅读全文
                    </button>
                </div>
            </div>
        );
    }
}

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: props.articles,
        }
    }

    render() {
        return (
            <div>
                <div className="card-columns">
                    {this.state.articles.map((article, index) => {
                        return <ArticleCard key={index} index={index} article={article}/>
                    })}
                </div>

                {this.state.articles.map((article, index) => {
                    return <ArticleModal key={index} index={index} article={article}/>
                })}
            </div>
        );
    }
}

// Create some articles
const articles = [
    // Source: https://www.thrive.org.uk/get-gardening/why-gardening-is-good-for-your-health
    new Article(
        '为什么园艺对你的健康有好处',
        `
        你可能已经有了绿色的手指，或者你一生中可能从未做过园艺。无论您的经验如何，园艺有很多方法可以改善您的健康和福祉。
        
        # 园艺的五个好处

        你有没有想过园艺会改变你的感觉？问问任何园丁为什么他们喜欢园艺，他们会一次又一次地说这让他们感觉很好。
        
        园艺可以为每个人带来不同的东西。这些是您健康和福祉的五个关键好处。
        
        ## 1.园艺可以支持你的身体健康
        ![园艺可以支持你的身体健康](1/Woman-working-in-garden.jpeg)
        园艺提供了使用和移动身体的方法。这可能是通过燃烧卡路里的身体任务。或者，可以通过温和的活动来培养精细的运动技能。
        
        挖掘、耙和割草等活动是卡路里燃烧器。根据卫生部的建议，它们可以帮助您每周进行150分钟的轻度有氧运动。
        
        一些园艺活动可以帮助保持身体灵活并增强肌肉力量。其他，如播种或完成工艺项目，可以帮助保持灵巧性。
        
        ## 2.园艺对心理健康有好处
        ![园艺对心理健康有好处](1/repotting-tomato-seedlings-pixabay.jpg)
        花园是具有恢复性的特殊空间。
        
        大量证据表明，在绿色环境中的时间可以减轻压力并改善福祉。皇家医师学院为一篇关于园艺促进健康的期刊文章整理了研究成果。他们发现，定期园艺可能会减轻NHS服务的压力。
        
        日本的一项研究表明，仅仅观察植物可以减轻压力、愤怒和悲伤。MIND慈善机构的研究表明，在花园里散步可以改善心理健康。
        
        我们还在Thrive进行了研究。我们调查了317名参加桌面园艺会议的人。大约80%的人认为他们的心理健康因此而有所改善。
        
        花园可以在很多方面支持我们的心理健康。从建立信心到提升情绪或感到平静，花园提供了选择和创造力。
        
        ## 3.花园让你继续学习
        ![花园让你继续学习](1/Reading-book-garden-pixabay.jpg)
        学习是五种幸福方式之一。新经济学基金会由英国政府委托开发了这些。这些旨在改善整个人口的心理健康和福祉。
        
        继续学习可能意味着尝试新事物或重新发现旧兴趣。它提供了一个建立信心和玩得开心的机会。
        
        将花园的一片区域变成迷你分配......事实证明这是我做过的最好的事情。它给了我信心，并帮助我了解植物：如何照顾它们，喂养它们，修剪它们。
        Nikki，园艺博主
        园艺是一次不断的发现之旅。你可能需要学习一些新东西，学习不同的技术或更好地了解自然。这是一个终身学习的机会。
        
        ## 4.花园让你在大自然中享受时光
        
        园艺和自然时间为改善我们的健康提供了巨大的潜力。来自环境心理学的证据表明，自然界的时间可以解决精神疲劳问题。它还可以对我们的大脑化学产生积极影响，影响血清素和皮质醇的释放，这有助于我们感觉良好。
        
        对于许多园丁来说，每天在花园里散步是最愉快的事情之一。它让你有一个平静的时刻，看看发生了什么变化。
        
        你不需要一个巨大的花园来从户外时间中受益。你仍然可以在阳台上种植大量的植物，并吸引野生动物让你坐下来观察。
        `,
        '1/cover.jpg',
        'https://reactjs.org/',
    ),
];

ReactDOM.createRoot(document.getElementById('root')).render(
    <ArticleList articles={articles}/>
);

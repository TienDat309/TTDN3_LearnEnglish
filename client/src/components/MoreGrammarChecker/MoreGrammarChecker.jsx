import React from "react";
import styles from "./MoreGrammarChecker.module.css";
import Image1 from "../../images/boy.jpg";
import Image2 from "../../images/girl.jpg";
import Image3 from "../../images/computer.jpg";

const MoreGrammarChecker = () => {
  return (
    <div className={styles.container}>
        <div className={styles.blockFirst}>
            <div className={styles.itemLeft}>
                <h1 className={styles.titleLeft}>More Than a Grammar Checker</h1>
                <p className={styles.contentLeftOne}>
                Whether you’re a native English speaker or just beginning to learn, English grammar can<br/>
                be confusing. But proper grammar isn’t the only thing you need to think about. Have you<br/>
                ever sent off an important email only to realize moments later that you forgot to run<br/>
                spell check and missed a mistake in the very first line? Do you struggle with<br/>
                apostrophes or spend way too long trying to identify the correct place to use a comma?<br/>
                Even if you’re confident in your grasp of English grammatical rules, it’s easy to mistype<br/>
                when you’re writing fast and concentrating on your ideas.<br/>
                </p>
                <p className={styles.contentLeftTwo}>
                Grammarly is more than a grammar check, more than a spell check, and more than a<br/>
                punctuation corrector. It’s a comprehensive writing tool that helps you write clear,<br/>
                flawless text that will impress your readers. With Grammarly, you’ll build writing skills<br/>
                while you’re correcting grammar, spelling, and punctuation mistakes as well as<br/>
                sentence structure problems, misused words, typos, and more.<br/>
                </p>
            </div>
            <div className={styles.itemRight}>
                <img src={Image2} alt=""/>
            </div>
        </div>

        <div className={styles.blockSecond}>
                <div className={styles.itemLetfSecond}>
                <img src={Image1} alt=""/>
                </div>
            <div className={styles.itemRightSecond}>
                <h1 className={styles.titleRightSecond}>Why Use Grammarly’s Writing Tool?</h1>
                <p className={styles.contentRightSecond}>
                Good writing is for everyone. Whether you’re working on an essay, a blog post, or an<br/>
                important email, presenting your ideas with clear, correct language makes a big<br/>
                impression on your reader. When the stakes are high, a grammar corrector can be a<br/>
                lifesaver. But with all the grammar checking tools available, it’s critical to pick one that<br/>
                you can rely on to catch mistakes every time.   
                </p>
                <p className={styles.contentRightSecond}>
                Grammarly’s products run on a sophisticated AI system built to analyze English<br/>
                sentences. Unlike other tools (most spell checkers, for instance) that rely on a rigid set<br/>
                of rules, Grammarly takes context into account when making corrections or<br/>
                suggestions. This means that when you write “affect” but you meant “effect,” Grammarly<br/>
                will let you know that you spelled the word right but used it in the wrong context.
                </p>
            </div>
        </div>

        <div className={styles.blockFirst}>
            <div className={styles.itemLeft}>
                <h1 className={styles.titleLeft}>Better Writing Everywhere<br/> With Grammarly</h1>
                <p className={styles.contentLeftOne}>
                Grammarly has a tool for just about every kind of writing you do. The online grammar<br/>
                checker is perfect for users who need a quick check for their text. Try the online editor<br/>
                for checking longer papers and essays, the iOS or Android app for mobile writing, and<br/>
                the browser extension to make sure your writing is clear and mistake-free on any<br/>
                website.
                </p>
                <p className={styles.contentLeftTwo}>
                When you create a Grammarly account, you’ll be able to select your preferred English<br/>
                dialect, add words to your personal dictionary, and check your text from anywhere. Plus,<br/>
                you’ll receive weekly updates about your vocabulary, productivity, and top mistakes, so<br/>
                you can track your improvement over time.
                </p>
            </div>
            <div className={styles.itemRightThrre}>
                <img src={Image3} alt=""/>
            </div>
        </div>
    </div>
  );
};

export default MoreGrammarChecker;

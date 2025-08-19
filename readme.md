# TeaBag: a Filter for Threads

You wouldn't drink tea without a filter, right? You'd get a mouthful of bitter leaves. That's what my Threads feed felt like. I built TeaBag to be the filter it desperately needed.

You should be in control of the things you see online, and TeaBag is here to help you with that. Simple.

### So, here's what it actually does.

#### Smart Content Filtering
Threads loves showing you posts from verified accounts you don't care about. Meta claims they don't place verified users higher in the feed, but I've measured a ratio of 1:1 before; a whole HALF of my feed was these annoying verified people!! Gross.

I don't think I should have to see your shitty posts just because you paid Mark Zuckerberg for the priviledge. That's why TeaBag hides every single one of them by default, and you will be SHOCKED at how it will improve the quality of your Threads feed. Think: what kind of person pays MONEY to get boosted on social media? Someone whose posts you wanna see?

If there's a verified account you actually like for some reason, just add them to the whitelist and they can stay. In addition, there's a blacklist for people who you don't wanna see but don't wanna block, and you can also build a list of filtered phrases... imagine a world where you never see another "that's it, that's the post". You're welcome.

#### Two times the filter does not work on purpose
You will still see replies to your posts from people who would otherwise be filtered, and the filter is paused on profiles since it would be kinda silly if you went to a verified person's profile and all their posts were filtered.

### How to Use It

1.  First, you need a userscript manager like [**Violentmonkey**](https://violentmonkey.github.io/) or [**Tampermonkey**](https://www.tampermonkey.net/).
2.  Install my script from this repository. Your userscript manager will prompt you to confirm the installation.
3.  Once it's installed, go to Threads. To open the control panel, click your **userscript manager's icon** in your browser's toolbar. A menu will appear where you can see all your running scripts. Find and click on **'TeaBag Filter Settings'**.

The panel is where you tell the script what to do:

-   **Verified Filter Mode**: This is the main toggle for verified accounts. `Filter All` is the default; it hides posts from verified users unless they are on your whitelist. `Show All` disables this specific filter entirely.
-   **The Lists**: These are the core of your filter. They're simple text boxes where you add items one per line. The **Whitelist** is for verified users you *want* to see. The **Blacklist** is for *any* user you want to hide completely. The **Filtered Words** list will hide any post that contains those words or phrases.
-   **General Toggles**: These are simple on/off switches for the other features. You can hide all checkmarks, hide the 'Suggested for you' box, and turn on the little counter that shows you how much junk is being filtered.

When you're done making changes, just hit **'Save & Apply'**.

Enjoy a feed that's actually yours. <3

- ArtificialSweetener
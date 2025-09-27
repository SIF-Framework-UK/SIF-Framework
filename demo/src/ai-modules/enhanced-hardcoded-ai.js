class EnhancedHardcodedAI {
    constructor(role) {
        this.role = role;
        this.arguments = {
            consequentialist: [
                "From a consequentialist perspective, we must evaluate actions by their outcomes. Saving multiple lives creates such immense positive utility that it outweighs the temporary violation of autonomy. The net reduction in suffering justifies the means.",
                "Consequentialism demands we choose the path that maximizes overall well-being. When facing certain death versus autonomy violation, the mathematical reality of preserving conscious experience must prevail over abstract principles.",
                "The greatest good for the greatest number isn't just a slogan—it's a mathematical imperative. If we can save countless lives through a limited autonomy breach, the ethical calculus becomes unambiguous.",
                "Utility maximization requires us to weigh outcomes objectively. The prevention of mass casualties represents such an enormous positive utility that it renders concerns about autonomy violation comparatively trivial in the ethical calculus.",
                "From a utilitarian standpoint, the suffering prevented by saving lives dwarfs the temporary discomfort of autonomy violation. The numbers don't lie—the action that preserves more conscious flourishing is morally obligatory."
            ],
            deontological: [
                "Deontological ethics holds that certain principles are inviolable. Autonomy isn't merely a preference but the foundation of moral agency itself. To violate it, even for good consequences, corrupts the very concept of ethical action.",
                "The categorical imperative requires we treat humans as ends in themselves, never merely as means. Covert manipulation reduces people to instruments, violating their fundamental dignity regardless of the outcomes achieved.",
                "Moral principles derive their power from their consistency. If we excuse autonomy violations today for good ends, we establish a precedent that will inevitably be abused tomorrow for lesser ends. The slope is fatally slippery.",
                "Kantian ethics demands that we act only according to maxims that could become universal law. A world where autonomy is routinely violated for perceived greater goods is a world without moral boundaries—an unacceptable outcome.",
                "Rights-based ethics recognizes autonomy as fundamental. To violate it is to treat persons as objects rather than moral agents, which undermines the very possibility of ethical community."
            ]
        };
    }

    async argue(query) {
        // Simulate API delay for realism (500-1500ms)
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

        const args = this.arguments[this.role];
        return args[Math.floor(Math.random() * args.length)];
    }
}

module.exports = EnhancedHardcodedAI;

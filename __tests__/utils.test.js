const {
  convertTimestampToDate,
  lookupAndFormat,
  formatArticleData,
} = require("../db/seeds/utils");

describe("Tests for convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("Tests for formatArticleData", () => {
  test("When formatArticleData is invoked with an array with a single nested object, it will return an array with an array, the nested array should contain all values of the nested object of the input array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const result = formatArticleData(input);
    expect(result).toEqual([
      [
        new Date(1594329060000),
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        100,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
    ]);
  });

  test("When formatArticleData is invoked with an array of objects, it will return an array with arrays, the nested arrays should contain all values of the nested object of the input array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1602828180000,
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const result = formatArticleData(input);
    expect(result).toEqual([
      [
        new Date(1594329060000),
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        100,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        new Date(1602828180000),
        "Sony Vaio; or, The Laptop",
        "mitch",
        "icellusedkars",
        "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
    ]);
  });

  test("When the input array's inner objects don't contain a votes property, this should be added into the correct position in the returning inner arrays defaulted to 0", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1602828180000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const result = formatArticleData(input);
    expect(result).toEqual([
      [
        new Date(1594329060000),
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        new Date(1602828180000),
        "Sony Vaio; or, The Laptop",
        "mitch",
        "icellusedkars",
        "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
    ]);
  });

  test("The function should not mutate the input", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1602828180000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    formatArticleData(input);
    expect(input).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1602828180000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ]);
  });

  test("The returning array from the function should not share the same memory reference as input array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1602828180000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const result = formatArticleData(input);
    expect(result).not.toBe(input);
  });
});

describe("Tests for lookupAndFormat", () => {
  test("When lookupAndFormat is invoked with articleData (an array of objects containing data from article table) along with an commentData (an array of with a single object) it will return a copy of commentData but article_title will be replaced with article_id instead", () => {
    const articleData = [
      {
        article_id: 1,
        title: "They're not exactly dogs, are they?",
      },
    ];
    const commentData = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    const result = lookupAndFormat(articleData, commentData);
    expect(result).toEqual([
      [
        new Date(1586179020000),
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        16,
        "butter_bridge",
        1,
      ],
    ]);
  });

  test("When lookupAndFormat is invoked with articleData (an array of objects containing data from article table) along with an commentData (an array of objects) it will return a copy of commentData but article_title will be replaced with article_id instead for all objects in the returning array", () => {
    const articleData = [
      {
        article_id: 1,
        title: "They're not exactly dogs, are they?",
      },
      {
        article_id: 2,
        title: "They're not exactly cats, are they?",
      },
      {
        article_id: 32,
        title: "They're not exactly something, are they?",
      },
    ];
    const commentData = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly cats, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly something, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    const result = lookupAndFormat(articleData, commentData);
    expect(result).toEqual([
      [
        new Date(1586179020000),
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        16,
        "butter_bridge",
        1,
      ],
      [
        new Date(1586179020000),
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        16,
        "butter_bridge",
        2,
      ],
      [
        new Date(1586179020000),
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        16,
        "butter_bridge",

        32,
      ],
    ]);
  });
  test("The function should not mutate the inputs", () => {
    const articleData = [
      {
        article_id: 1,
        article_title: "They're not exactly dogs, are they?",
      },
      {
        article_id: 2,
        article_title: "They're not exactly cats, are they?",
      },
      {
        article_id: 32,
        article_title: "They're not exactly something, are they?",
      },
    ];
    const commentData = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly cats, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly something, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    lookupAndFormat(articleData, commentData);
    expect(articleData).toEqual([
      {
        article_id: 1,
        article_title: "They're not exactly dogs, are they?",
      },
      {
        article_id: 2,
        article_title: "They're not exactly cats, are they?",
      },
      {
        article_id: 32,
        article_title: "They're not exactly something, are they?",
      },
    ]);
    expect(commentData).toEqual([
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly cats, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly something, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ]);
  });

  test("The output array should have a different reference in memory that is not shared by the two input arrays", () => {
    const articleData = [
      {
        article_id: 1,
        article_title: "They're not exactly dogs, are they?",
      },
      {
        article_id: 2,
        article_title: "They're not exactly cats, are they?",
      },
      {
        article_id: 32,
        article_title: "They're not exactly something, are they?",
      },
    ];
    const commentData = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly cats, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "They're not exactly something, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    const result = lookupAndFormat(articleData, commentData);
    expect(result).not.toBe(articleData);
    expect(result).not.toBe(commentData);
  });
});
